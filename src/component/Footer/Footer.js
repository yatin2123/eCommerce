import React from 'react';

function Footer(props) {
    return (
        <div>
            <footer className=" footer_section">
                <div className="container">
                    <p>
                        © <span id="displayYear" /> All Rights Reserved By
                        <a href="https://html.design/">Free Html Templates</a>
                    </p>
                </div>
            </footer>
        </div>

    );
}

export default Footer;