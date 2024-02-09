import React from 'react';
import { primary } from './Button.style';
import { secondry } from './Button.style';
import { outline } from './Button.style';

function Button({children, btntype= 'primary',btndisabled=false, ...rest}) {
    const CheckButton = () => {
        switch (btntype) {
            case 'primary':
                return primary
            case 'secondry':
            return secondry

            case 'outline':
           return outline
        }
    }
    const CustomButtom = CheckButton(); 
    return (
       
            <>
                <CustomButtom disabled ={btndisabled} {...rest}>
                 {children}
                </CustomButtom>
            </>
        
    );
}

export default Button;