import { Component } from "react";
import Date from "./date";
import TagList from "./tagList";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

export default class Content extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render = () => this.props.postPage ? (
    <div>
      <div className="pb-4">
        <h1>{this.props.data.title}</h1>
        <div className="mt-3 fs-5 text-muted"><Date time={this.props.data.time} /></div>
        <div className="mt-2"><TagList dark={this.props.dark} tags={this.props.data.tag} /></div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
    </div>
  ) : (
    <div>{this.props.content}</div>
  );
}