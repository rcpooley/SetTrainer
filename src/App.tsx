import './App.css';
import { CardRenderer } from './cardRenderer/cardRenderer';
import { Navbar } from './navbar';
import { CardColor, CardFilling, CardNumber, CardShape } from './types';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="content">
                <CardRenderer
                    card={{
                        color: CardColor.Red,
                        number: CardNumber.Two,
                        filling: CardFilling.Empty,
                        shape: CardShape.Squigle,
                    }}
                />
            </div>
        </div>
    );
}

export default App;
