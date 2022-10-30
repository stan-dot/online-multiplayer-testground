import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  ArticleMetadata,
  ArticleText,
  ArticleToRead,
  ImageObject,
} from "./types";

// https://en.wikipedia-on-ipfs.org/wiki/

// https://anagora.org/node/tiddlers
// todo anagora integration
// https://en.wikipedia.org/wiki/Zettelkasten - these are the automatically repeating notes

// fully serverless solution
// fully IPFS - transparent profile, or NFT profile that you connect with?

// https://en.wikipedia.org/wiki/RSS it is replicating rss in a way
// but you get what other users are doing, based on your social graph


// a list of whitelisted providers, running on arveave
// agora works, ipfs too
// also rss could be read here https://rssapi.net/
// interconnected digital garden - uniform reader's experience. saving userdata into cookies, or drive, lens, or ipfs

// todo this could always be an ipfs url
// even each of the articles to read could be on ipfs
const TIDDLERS_TEST: ArticleToRead = {
  url: "https://anagora.org/node/tiddlers",
  publicMetadata: {
    wordCount: 0,
    views: 0,
  },
  metadata: {
    wordCount: 0,
    liking: 0,
    readDate: 0,
    notes: 0,
    readStatus: false,
    readWords: 0,
  },
};

/**
 * todo - isolate the main bit, without side hyperlinks - only the focused view of 1 node
 * @param data
 * @returns
 */
function getArticleText(data: any): ArticleText {
  const t: ArticleText = {
    title: "",
    subtitle: "",
    images: [],
    paragraphs: [],
  };
  return t;
}

/**
 * todo views:
 * history view
 * library view
 * timeline view
 * one article view
 *
 * @returns
 */

/**
 * layout  on the middle the reader or inspect all, or inspect history
 * on the left add new panel
 * on the right social share, lens profile share
 * todo move the mode to a style wrapper
 */
export default function ArticleReader(): JSX.Element {
  const [mode, setMode] = useState("light");
  const [articleVisible, setArticleVisible] = useState(false);

  const [currentlyReadArticle, setCurrentlyReadArticle] = useState(
    {} as ArticleToRead,
  );
  const [newArticleAdditionPromptVisible, setNewArticleAdditionPromptVisible] =
    useState(false);

  useEffect(() => {
    const test: ArticleToRead = TIDDLERS_TEST;

    const headers: AxiosRequestHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/html',
    };

    const config: AxiosRequestConfig = {
      method: 'GET',
      withCredentials: false,
      headers: headers
    };

    axios.get(test.url, config).then((r: AxiosResponse) => {
      if (r.status === 200) {
        const html: HTMLElement = r.data;
        console.log(html);
      }
    }).catch((error) => console.log(error));

    // https://dev.to/aurelkurtula/introduction-to-web-scraping-with-nodejs-9h2 - they use cherrio there,
    // that might be slow, might resort to Rust WASM
    // https://medium.com/@arpith/parsing-html-in-rust-5f2fe0efcd5a
    // https://stackoverflow.com/questions/71707791/how-to-read-and-parse-html-from-files-or-from-string
    // universalized might be from blogspot or

    return () => { };
  }, []);

  return (
    <div id="articleReaderContainer">
      <h3>Article readerq</h3>
      <ArticleDisplay article={currentlyReadArticle} />
    </div>
  );
}


function ArticleDisplay(props: { article: ArticleToRead }): JSX.Element {
  const [metadataVisible, setMetadataVisible] = useState(false);
  return (
    <div id="articleDisplay">
      <h4>that's your article:</h4>
      <button
        onClick={() =>
          metadataVisible
            ? setMetadataVisible(false)
            : setMetadataVisible(true)}
      >
        show metadata
      </button>
      {metadataVisible && <MetadataDisplay data={props.article.metadata} />}
      {props.article.text
        ? <DisplayText text={props.article.text} />
        : "Loading"}
    </div>
  );
}

/**
 * todo sort out the images
 * @param props
 * @returns
 */
function DisplayText(props: { text: ArticleText }): JSX.Element {
  const images: ImageObject[] = props.text.images;
  const paragraphs: string[] = props.text.paragraphs;

  return (
    <div id="paragraphs container">
      <h2>{props.text.title}</h2>
      <h4>{props.text.subtitle}</h4>
      {paragraphs.map((s) => <p>{s}</p>)}
    </div>
  );
}

/**
 * todo add absolute location props, and the right zIndex
 * @param props
 * @returns
 */
function MetadataDisplay(props: { data: ArticleMetadata }): JSX.Element {
  return (
    <div id="metadata">
      <label htmlFor="notes">Notes</label>
      <p id="notes">{props.data.notes}</p>
    </div>
  );
}
