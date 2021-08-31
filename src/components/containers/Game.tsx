import * as React from "react";
import * as API from "../../middleware/api";

interface GameViewProps {
  currentGameId: string | null;
  numberToGuess: number | null;
  toggleRestartViewHandler: () => void;
}

interface GameViewState {
  propositionValue: string;
  propositionErrorShouldAppear: boolean;
  guessState: string;
  propositions: Array<number>;
}

export class GameView extends React.Component<GameViewProps, GameViewState> {
  constructor(props: GameViewProps) {
    super(props);

    this.state = {
      propositionValue: "",
      propositionErrorShouldAppear: false,
      guessState: "",
      propositions: [],
    };

    this.handlePropositionChange = this.handlePropositionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePropositionChange(event: any): void {
    this.setState({ propositionValue: event.target.value, propositionErrorShouldAppear: false });
  }

  async handleSubmit(event: any): Promise<void> {
    event.preventDefault();
    const { currentGameId, toggleRestartViewHandler } = this.props;
    const { propositionValue } = this.state;
    if (currentGameId !== null) {
      if (propositionValue.length > 0) {
        const propositionToSend: number = parseInt(propositionValue);

        try {
          const apiResponse = await API.sendProposition(currentGameId, propositionToSend);
          const result = apiResponse.data;
          this.setState({ propositionValue: "", guessState: result.state, propositions: result.propositions });
          if (result.state === "FOUND" || result.state === "MAX_PROPOSITION_ACHIEVED") {
            toggleRestartViewHandler();
          }
        } catch (error) {
          console.log("ERR: handleSubmit!");
          this.setState({ propositionValue: "", propositionErrorShouldAppear: true });
        }
      } else {
        console.log("ERR: a proposition is required!");
      }
    } else {
      console.log("ERR: we cannot retrieve the game!");
    }
  }

  render() {
    const { numberToGuess } = this.props;
    const { propositionValue, guessState, propositionErrorShouldAppear, propositions } = this.state;
    return (
      <div>
        <p>We have selected a random number between 1 and 100.</p>
        <p>See if you can guess it in 10 turns or fewer.</p>
        <p> We&apos;ll tell you if your guess was too high or too low.</p>
        {guessState !== "FOUND" && guessState !== "MAX_PROPOSITION_ACHIEVED" && (
          <>
            <p>{JSON.stringify(propositions)}</p>
            <form onSubmit={this.handleSubmit} noValidate>
              <label htmlFor="name">Enter a guess:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={propositionValue}
                className={propositionErrorShouldAppear ? "inputError" : ""}
                onChange={this.handlePropositionChange}
                minLength={1}
                maxLength={3}
                size={10}
              />
              <button type="submit">Submit guess</button>
            </form>
          </>
        )}
        {guessState === "TOO_LOW" && <p>Too low!</p>}
        {guessState === "TOO_HIGH" && <p>Too high!</p>}
        {guessState === "FOUND" && <p>{`Found, it was ${numberToGuess} !`}</p>}
        {guessState === "MAX_PROPOSITION_ACHIEVED" && <p>{`It was ${numberToGuess} you lost! No more try!`}</p>}
      </div>
    );
  }
}
