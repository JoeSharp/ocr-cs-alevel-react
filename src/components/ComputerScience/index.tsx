import React from "react";
import { Page } from "src/types";

import { page as binaryTreeTraversalPage } from "./Algorithms/BinaryTreeTraversal";
import { page as graphTraversalPage } from "./Algorithms/GraphTraversal";
import { page as pageRankPage } from "./Algorithms/PageRank";
import { page as routingGridPage } from "./Algorithms/Routing/GridRouting";
import { page as routingGraphPage } from "./Algorithms/Routing/GraphRouting";
import { page as searchPage } from "./Algorithms/Search";
import { page as sortingPage } from "./Algorithms/Sorting";
import { page as binaryTreePage } from "./DataStructures/BinaryTreeComponent";
import { page as graphPage } from "./DataStructures/GraphComponent";
import { page as stackPage } from "./DataStructures/StackComponent";
import { page as queuePage } from "./DataStructures/QueueComponent";
import CardCollection from "../Bootstrap/CardCollection";
import Jumbotron from "../Bootstrap/Jumbotron";

const algorithmPages = [
  binaryTreeTraversalPage,
  graphTraversalPage,
  pageRankPage,
  routingGraphPage,
  routingGridPage,
  searchPage,
  sortingPage,
];

const dataStructurePages = [binaryTreePage, graphPage, stackPage, queuePage];

const ComputerScience: React.FunctionComponent = () => (
  <div>
    <Jumbotron
      title="Computer Science"
      lead="The algorithms and data structures are focussed on those required by the
      OCR GCSE and A Level"
    />

    <h2>Algorithms</h2>
    <CardCollection cards={algorithmPages} />

    <h2>Data Structures</h2>
    <CardCollection cards={dataStructurePages} />
  </div>
);

export const page: Page = {
  href: "/computerScience",
  title: "Computer Science",
  description:
    "Explore KS4 and KS5 Computer Science Algorithms and Data Structures",
  component: ComputerScience,
};

export const pages: Page[] = [
  page,
  binaryTreeTraversalPage,
  graphTraversalPage,
  pageRankPage,
  routingGridPage,
  routingGraphPage,
  searchPage,
  sortingPage,
  binaryTreePage,
  graphPage,
  stackPage,
  queuePage,
];

export default ComputerScience;
