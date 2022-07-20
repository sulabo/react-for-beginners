import {useState, useEffect} from 'react';


function App() {
  const [loading, setLoading] = useState(true);
  const [myMoney, setMyMoney] =useState("");
  const [coinPrice, setCoinPrice] = useState(Infinity);
  const [resultMoney, setResultMoney] = useState(0);
  const [coins, setCoins] = useState([]);
  const [symbols, setSymbols] = useState("");
    useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json( ))
    .then((json) => 
    setCoins(json));
    setLoading(false);
  }, [])

  useEffect(() => {
    setResultMoney(myMoney/coinPrice);
  }, [myMoney, coinPrice]);

  const onChange = (event) => setMyMoney(event.target.value);

  const onChangeSelect = (event) => {
    const price = coins[event.target.selectedIndex].quotes.USD.price;
    const symbol = coins[event.target.selectedIndex].symbol;
    setCoinPrice(parseFloat(price));
    setSymbols(symbol);
  };


  return (
    <div>
      <h1>The Coins {loading ? "" : `(${coins.length})`} </h1>
      <form >
      <input value={myMoney} type="number" placeholder="how much money do you have" onChange={onChange} />

      </form>
      <hr/>
      {loading ? (<strong>Loading...</strong>) : (<select onChange={onChangeSelect}>
        {coins.map((coin) => (
        <option key={coin.id}>
          {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
          </option>
          ))}
      </select>
      )}
      <h4>
        your money : ${myMoney} === {resultMoney} {symbols}
      </h4>
    </div>
  );
}

export default App;
