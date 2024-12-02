import {useState} from "react";
import '../../assets/Login.css';

const Login = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [isLeftPanelActive, setIsLeftPanelActive] = useState(false);
    const [isForgotVisible, setIsForgotVisible] = useState(true);

    const handleSignUp = () => {
        setIsRightPanelActive(true);
    };

    const handleSignIn = () => {
        setIsRightPanelActive(false);
    };

    const handleForgot = () => {
        setIsLeftPanelActive(true);
    };

    const handleSlideUp = () => {
        setIsForgotVisible(false);
    };

    const handleSlideDown = () => {
        setIsForgotVisible(true);
    };
    return (
        <div
            className={`container ${isRightPanelActive ? 'right-panel-active' : ''} ${isLeftPanelActive ? 'left-panel-active' : ''}`}>
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <div className="account-input">
                        <i className="far fa-user"></i>
                        <input type="text" placeholder="Name"/>
                    </div>
                    <div className="account-input">
                        <i className="far fa-envelope"></i>
                        <input type="email" placeholder="Email"/>
                    </div>
                    <div className="account-input">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password"/>
                    </div>
                    <button className="mt-3">Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#" id="sign-in-container">
                    <div id="forgot" className={isForgotVisible ? '' : 'hide'}>
                        <div className="enter-email">
                            <div className="enter-email-detail">
                                <h1>Do you forgot ?</h1>
                                <p>Just enter your email to retrieve your password</p>
                                <div className="account-input ">
                                    <i className="far fa-envelope"></i>
                                    <input type="email" placeholder="Email"/>
                                </div>
                                <div className="">
                                    <button className="signIn-form-button">Send</button>
                                    <p id="slideup" style={{cursor: 'pointer'}} onClick={handleSlideUp}><u>close</u></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <div className="account-input ">
                        <i className="far fa-envelope"></i>
                        <input type="email" placeholder="Email"/>
                    </div>
                    <div className="account-input">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Password"/>
                    </div>
                    <p className="forgot" id="slidedown" onClick={handleSlideDown}> Forgot your password? </p>
                    <button className="signIn-form-button">Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="square"></div>
                    <div className="triangle"></div>
                    <div className="circle"></div>
                    <div className="square2"></div>
                    <div className="triangle2"></div>
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={handleSignIn}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={handleSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
            <button onClick={handleForgot} id="forgot">Forgot Password</button>
            <button onClick={handleSlideUp} id="slideup">Slide Up</button>
            <button onClick={handleSlideDown} id="slidedown">Slide Down</button>
        </div>
    );
};

export default Login;