import * as React from "react";
import { connect } from "react-redux";
import { CounterStoreInterface } from "../../model/redux/Counter";
import { StoreState } from "../../reducers/indexReducers";
import { inctCounter, dectCounter } from "../../actions/counterActions";
import { StoreDispatch } from "../App";
import * as API from "../../middleware/api";

interface HomeProps {
  counter: CounterStoreInterface;
  increment: () => void;
  decrement: () => void;
}

interface HomeState {
  currentGameId: string | null;
  propositionValue: string;
  guessState: string;
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      currentGameId: null,
      propositionValue: "",
      guessState: "",
    };

    this.handlePropositionChange = this.handlePropositionChange.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePropositionChange(event: any) {
    this.setState({ propositionValue: event.target.value });
  }

  async handleCreateGame() {
    try {
      const apiResponse = await API.createGame();
      const gameCreated = apiResponse.data;
      this.setState({ currentGameId: gameCreated.id });
    } catch (error) {
      console.log("ERR: handleCreateGame");
    }
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    const { currentGameId, propositionValue } = this.state;
    if (currentGameId !== null) {
      if (propositionValue.length > 0) {
        const propositionToSend: number = parseInt(propositionValue);

        try {
          const apiResponse = await API.sendProposition(currentGameId, propositionToSend);
          const result = apiResponse.data;
          this.setState({ propositionValue: "", guessState: result.state });
        } catch (error) {
          console.log("ERR: handleSubmit!");
        }
      } else {
        console.log("ERR: a proposition is required!");
      }
    } else {
      console.log("ERR: we cannot retrieve the game!");
    }
  }

  render() {
    const { currentGameId, propositionValue, guessState } = this.state;
    return (
      <div>
        <h1>Number guessing game</h1>
        {currentGameId !== null ? (
          <>
            <p>We have selected a random number between 1 and 100.</p>
            <p>See if you can guess it in 10 turns or fewer.</p>
            <p> We&apos;ll tell you if your guess was too high or too low.</p>
            <form onSubmit={this.handleSubmit} noValidate>
              <label htmlFor="name">Enter a guess:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={propositionValue}
                onChange={this.handlePropositionChange}
                minLength={1}
                maxLength={3}
                size={10}
              />
              <button type="submit">Submit guess</button>
            </form>
            {guessState === "TOO_LOW" && <p>Too low!</p>}
            {guessState === "TOO_HIGH" && <p>Too high!</p>}
            {guessState === "FOUND" && <p>Found!</p>}
          </>
        ) : (
          <>
            <button type="button" onClick={this.handleCreateGame}>
              Start
            </button>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    increment: () => dispatch(inctCounter()),
    decrement: () => dispatch(dectCounter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
