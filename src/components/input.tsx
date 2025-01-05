import { useEffect, useState } from 'react';
import { Util } from '../util/util';

type Validation = {
    valid: boolean;
    message?: string;
};

type BaseProps = {
    label?: string;
    placeholder?: string;
    validation?: Validation;
};

type Val<T> = {
    value: T;
    onChange: (value: T) => void;
};

type TextProps = BaseProps &
    Val<string> & {
        type: 'text';
    };

type IntProps = BaseProps &
    Val<number | null> & {
        type: 'int';
    };

type Props = TextProps | IntProps;

export function Input(props: Props) {
    switch (props.type) {
        case 'text':
            return <InputText {...props} />;
        case 'int':
            return <InputInt {...props} />;
    }
}

function InputText(props: TextProps) {
    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <div className="form-group">
                <input
                    type="text"
                    className={Util.classes(
                        'form-control',
                        props.validation != null &&
                            (props.validation.valid ? 'is-valid' : 'is-invalid')
                    )}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
                {props.validation?.message != null && (
                    <div
                        className={
                            props.validation.valid
                                ? 'valid-feedback'
                                : 'invalid-feedback'
                        }
                    >
                        {props.validation.message}
                    </div>
                )}
            </div>
        </div>
    );
}

function InputInt(props: IntProps) {
    const [str, setStr] = useState<string>(
        props.value === null ? '' : props.value.toString()
    );
    const [validation, setValidation] = useState<Validation | undefined>(
        undefined
    );
    useEffect(() => {
        if (props.value !== null) setStr(props.value.toString());
    }, [props.value]);
    return (
        <InputText
            type="text"
            value={str}
            onChange={(newStr) => {
                const val = parseInt(newStr);
                if (isNaN(val)) {
                    setStr(newStr);
                    setValidation({
                        valid: false,
                        message: 'Not a valid int',
                    });
                    if (props.value !== null) {
                        props.onChange(null);
                    }
                } else {
                    setStr(val.toString());
                    if (validation != null) {
                        setValidation(undefined);
                    }
                    props.onChange(val);
                }
            }}
            label={props.label}
            placeholder={props.placeholder}
            validation={props.validation ?? validation}
        />
    );
}
