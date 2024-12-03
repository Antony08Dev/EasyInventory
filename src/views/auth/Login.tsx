import { useState } from "react";
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
                    <h1>Crear Cuenta</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>o utiliza tu correo electrónico para registrarte</span>
                    <div className="account-input">
                        <i className="far fa-user"></i>
                        <input type="text" placeholder="Nombre"/>
                    </div>
                    <div className="account-input">
                        <i className="far fa-envelope"></i>
                        <input type="email" placeholder="Correo"/>
                    </div>
                    <div className="account-input">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Contraseña"/>
                    </div>
                    <button className="mt-3">Registrarse</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#" id="sign-in-container">
                    <div id="forgot" className={isForgotVisible ? '' : 'hide'}>
                        <div className="enter-email">
                            <div className="enter-email-detail">
                                <h1>¿Olvidaste tu contraseña?</h1>
                                <p>Simplemente ingresa tu correo para recuperar tu contraseña</p>
                                <div className="account-input">
                                    <i className="far fa-envelope"></i>
                                    <input type="email" placeholder="Correo"/>
                                </div>
                                <div className="">
                                    <button className="signIn-form-button">Enviar</button>
                                    <p id="slideup" style={{cursor: 'pointer'}} onClick={handleSlideUp}><u>Cerrar</u></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1>Iniciar Sesión</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>o utiliza tu cuenta</span>
                    <div className="account-input">
                        <i className="far fa-envelope"></i>
                        <input type="email" placeholder="Correo"/>
                    </div>
                    <div className="account-input">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Contraseña"/>
                    </div>
                    <p className="forgot" id="slidedown" onClick={handleSlideDown}>¿Olvidaste tu contraseña?</p>
                    <button className="signIn-form-button">Iniciar Sesión</button>
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
                        <h1>¡Bienvenido de nuevo!</h1>
                        <p>Para mantenerte conectado con nosotros, por favor inicia sesión con tu información personal</p>
                        <button className="ghost" id="signIn" onClick={handleSignIn}>Iniciar Sesión</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>¡Hola, Amigo!</h1>
                        <p>Introduce tus datos personales y empieza tu viaje con nosotros</p>
                        <button className="ghost" id="signUp" onClick={handleSignUp}>Registrarse</button>
                    </div>
                </div>
            </div>
            <button onClick={handleForgot} id="forgot">Recuperar Contraseña</button>
            <button onClick={handleSlideUp} id="slideup">Cerrar</button>
            <button onClick={handleSlideDown} id="slidedown">Mostrar Recuperar Contraseña</button>
        </div>
    );
};

export default Login;
