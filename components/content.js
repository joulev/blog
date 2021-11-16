import { Component } from "react";
import Date from "./date";
import TagList from "./tagList";
import Prism from "prismjs";
import styles from "./content.module.scss";

export default class Content extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render = () => this.props.postPage ? (
    <div className={styles.all}>
      <div className={styles.heading}>
        <h1>{this.props.data.title}</h1>
        <div className={styles.metadata}>
          <div className={`${styles.date} fs-5 text-muted`}><Date time={this.props.data.time} /></div>
          <TagList dark={this.props.dark} tags={this.props.data.tag} />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
    </div>
  ) : (
    <div className={styles.all}>{this.props.content}</div>
  );
}