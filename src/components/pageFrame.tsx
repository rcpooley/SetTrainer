import { ChildrenProps } from '../types/componentTypes';
import { Navbar } from './navbar';

export function PageFrame({ children }: ChildrenProps) {
    return (
        <div
            css={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Navbar />
            <div css={{ flexGrow: 1, position: 'relative' }}>
                <div
                    css={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
