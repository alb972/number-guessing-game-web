import * as React from "react";
import { connect } from "react-redux";
import { CounterStoreInterface } from "../../model/redux/Counter";
import { StoreState } from "../../reducers/indexReducers";
import { inctCounter, dectCounter } from "../../actions/counterActions";
import { StoreDispatch } from "../App";
import * as API from "../../middleware/api";
import { GameView } from "./Game";

interface HomeProps {
  counter: CounterStoreInterface;
  increment: () => void;
  decrement: () => void;
}

interface NGGGame {
  currentGameId: string | null;
  numberToGuess: number | null;
}

interface HomeState {
  games: Array<NGGGame>;
  shouldDisplayRestartView: boolean;
  levels: Array<string>;
  currentLevel: number;
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      games: [],
      shouldDisplayRestartView: false,
      levels: ["EASY", "MEDIUM", "HARD"],
      currentLevel: 0,
    };

    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handleDecrementLevel = this.handleDecrementLevel.bind(this);
    this.handleIncrementLevel = this.handleIncrementLevel.bind(this);
    this.handleQuitGame = this.handleQuitGame.bind(this);
    this.handleOpenRestartView = this.handleOpenRestartView.bind(this);
  }

  async handleCreateGame() {
    const { games, currentLevel, levels } = this.state;

    try {
      const apiResponse = await API.createGame(levels[currentLevel]);
      const gameCreated = apiResponse.data;
      this.setState({
        shouldDisplayRestartView: false,
        games: [
          ...games,
          {
            currentGameId: gameCreated.id,
            numberToGuess: gameCreated.currentGuess,
          },
        ],
      });
    } catch (error) {
      console.log("ERR: handleCreateGame");
    }
  }

  handleDecrementLevel() {
    const { currentLevel, levels } = this.state;
    console.log(currentLevel);
    this.setState({ currentLevel: (currentLevel - 1) % levels.length });
  }

  handleIncrementLevel() {
    const { currentLevel, levels } = this.state;
    this.setState({ currentLevel: (currentLevel + 1) % levels.length });
  }

  handleOpenRestartView() {
    this.setState({ shouldDisplayRestartView: true });
  }

  handleQuitGame() {
    this.setState({ games: [] });
  }

  render() {
    const { games, shouldDisplayRestartView, levels, currentLevel } = this.state;
    return (
      <div>
        <h1>Number guessing game</h1>
        {games.length > 0 ? (
          <>
            {games.map((game) => {
              return (
                <GameView
                  key={game.currentGameId}
                  currentGameId={game.currentGameId}
                  numberToGuess={game.numberToGuess}
                  toggleRestartViewHandler={this.handleOpenRestartView}
                />
              );
            })}
            {shouldDisplayRestartView && (
              <>
                <button type="button" onClick={this.handleCreateGame}>
                  Retry ?
                </button>
                <div className="counter">
                  <p>{levels[currentLevel]}</p>
                  <button type="button" onClick={this.handleIncrementLevel}>
                    {`->`}
                  </button>
                </div>
              </>
            )}
            <button type="button" onClick={this.handleQuitGame}>
              Quit
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={this.handleCreateGame}>
              Start a game
            </button>
            <div className="counter">
              <p>{levels[currentLevel]}</p>
              <button type="button" onClick={this.handleIncrementLevel}>
                {`->`}
              </button>
            </div>
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
