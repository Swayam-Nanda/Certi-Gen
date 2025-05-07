from flask import Flask, render_template, request, redirect, session, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
import random
import json

with open('config.json', 'r') as c:
    parmas = json.load(c)["parmas"]

app = Flask(__name__)
app.secret_key = 'supersecretkey123'

# ✅ Mail config
app.config.update(
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME=parmas['user_name'],
    MAIL_PASSWORD=parmas['password']
)
mail = Mail(app)
app.config['SQLALCHEMY_DATABASE_URI'] = parmas['local_url']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
@app.route("/")
def login():
    return render_template("Login.html", parmas=parmas)

@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')

        # ✅ Check if user already exists
        existing_user = Users.query.filter_by(email=email).first()
        if existing_user:
            return "❌ Email already registered. Try logging in."

        # ✅ Generate and send OTP
        otp = str(random.randint(100000, 999999))
        session['otp'] = otp
        session['name'] = name
        session['email'] = email
        session['password'] = password

        try:
            mail.send_message(
                'Your OTP for Registration',
                sender=parmas['user_name'],
                recipients=[email],
                body=f"Hello {name},\n\nYour OTP is: {otp}\n\nThank you!"
            )
            return redirect(url_for('verify_otp'))
        except Exception as e:
            return f"Failed to send OTP. Error: {e}"

    return render_template('Login.html')
@app.route('/verify_otp', methods=['GET', 'POST'])
def verify_otp():
    if request.method == 'POST':
        user_otp = request.form.get('otp')
        session_otp = session.get('otp')

        if not session_otp or not session.get('email'):
            return "❌ Session expired. Please register again."

        if user_otp == session_otp:
            # ✅ OTP is correct
            try:
                new_user = Users(
                    name=session['name'],
                    email=session['email'],
                    password=session['password']
                )
                db.session.add(new_user)
                db.session.commit()
            except Exception as e:
                return f"❌ Failed to register user: {e}"

            # ✅ Clear session
            session.clear()
            return redirect(url_for('home'))  # make sure 'home' route exists
        else:
            return "❌ Invalid OTP. Please try again."

    return render_template('otp_verify.html')  # ✅ Create this template


# ✅ Route: Dummy Home Page
@app.route('/home')
def home():
    return "✅ Registration successful! Welcome."

# ✅ Route: Test email
@app.route("/testmail")
def testmail():
    try:
        mail.send_message(
            "Test Email from Flask",
            sender=parmas['user_name'],
            recipients=[parmas['user_name']],
            body="This is a test email using Flask-Mail."
        )
        return "✅ Test email sent successfully!"
    except Exception as e:
        return f"❌ Error: {e}"
@app.route("/login", methods=["POST"])
def login_post():
    email = request.form.get("email")
    password = request.form.get("password")
    
    print("Login attempt:", email, password)  # DEBUG

    user = Users.query.filter_by(email=email, password=password).first()

    if user:
        session['user_id'] = user.id
        return redirect(url_for("home"))
    else:
        return "❌ Invalid login credentials"


# ✅ Run the app
if __name__ == "__main__":
    app.run(debug=True, port=8000)

