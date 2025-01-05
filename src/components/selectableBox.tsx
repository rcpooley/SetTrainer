import { css } from '@emotion/react';
import { ChildrenProps, MaybeClassNameProps } from '../types/componentTypes';

type Props = ChildrenProps &
    MaybeClassNameProps & {
        selected?: boolean;
        onClick?: () => void;
    };

export function SelectableBox({
    selected,
    onClick,
    className,
    children,
}: Props) {
    return (
        <div
            className={className}
            css={css([
                {
                    border: '1px solid rgba(0, 0, 0, 0.87)',
                    borderRadius: '7px',
                },
                selected && {
                    boxShadow: '0px 0px 5px 3px #4b9e9e !important',
                },
                onClick != null && {
                    cursor: 'pointer',
                    ':hover': {
                        boxShadow: '0px 0px 5px 3px #bbb',
                    },
                },
            ])}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
