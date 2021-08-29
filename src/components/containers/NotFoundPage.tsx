/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from "react";

interface NotFoundPageProps {}
interface NotFoundPageState {}

export default class NotFoundPage extends React.Component<NotFoundPageProps, NotFoundPageState> {
  constructor(props: NotFoundPageProps) {
    super(props);
  }

  render(): JSX.Element {
    return <h1>Not Found</h1>;
  }
}
