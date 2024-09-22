import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { Provider } from 'react-redux';
import store from './redux/store';
import { CssBaseline } from '@mui/material';
import CharacterScreen from './views/screens/CharacterScreen';


function App() {
  return (

    <Provider store={store}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>React Coding Exercise</h1>
        </header>
        <section className="App-section">
          <CharacterScreen attributeList={ATTRIBUTE_LIST} classList={CLASS_LIST} skillList={SKILL_LIST} />
        </section>
      </div>
    </Provider >


  );
}

export default App;
