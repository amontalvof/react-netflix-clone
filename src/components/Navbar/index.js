import React, { useEffect, useState } from "react";
import { SiGithub, SiLinkedin, SiNetflix } from "react-icons/si";
import "./Navbar.css";

function Navbar() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <SiNetflix className="nav_logo" />
            <h3 className="nav_copy">
                Copyright &copy; Andy Montalvo {new Date().getFullYear()}, all
                rights reserved.{" "}
                <a
                    className="iconos_Sociales"
                    href={
                        "https://www.linkedin.com/in/andy-montalvo-fern%C3%A1ndez-6a9a37148/"
                    }
                >
                    <SiLinkedin />
                </a>{" "}
                <a
                    className="iconos_Sociales"
                    href={"https://github.com/amontalvof"}
                >
                    <SiGithub />
                </a>
            </h3>
        </div>
    );
}

export default Navbar;
