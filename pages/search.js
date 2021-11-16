import { Component } from "react";
import Layout from "../components/layout";
import SearchBox from "../components/searchBox";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  render = () => (
    <Layout dark={this.props.dark} changeMode={this.props.changeMode} title="Search"
      postPage={false} data={{}} activeLink={3}>
      <SearchBox dark={this.props.dark} onChange={q => this.setState({ query: q })} />
      <p>{this.state.query}</p>
    </Layout>
  );
}
