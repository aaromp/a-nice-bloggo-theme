var toHtml = require("hast-util-to-html");
const link = require("hast-util-to-mdast/lib/handlers/link");
var visit = require("unist-util-visit");
const fs = require("fs");

function abbr(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function b(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function cite(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function dfn(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function i(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function ins(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function kbd(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function mark(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function q(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function del(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function samp(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function small(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function sub(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function sup(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function u(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function iframe(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function figcaption(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function video(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}

function audio(h, node) {
  return h(node, "html", toHtml(node, { space: "html" }));
}


function figure(h, node) {
  if (
    node.properties &&
    node.properties.className &&
    node.properties.className.includes("kg-bookmark-card")
  ) {
    const boomarkCardData = {
      title: "",
      description: "",
      url: node.properties.href,
    };
    visit(node, function(node) {
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-title")
      ) {
        boomarkCardData.title = node.children[0].value;
      }
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-description")
      ) {
        boomarkCardData.description = node.children[0].value;
      }
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-author")
      ) {
        boomarkCardData.author = node.children[0].value;
      }
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-publisher")
      ) {
        boomarkCardData.publisher = node.children[0].value;
      }
      if (
        node.properties &&
        node.properties.className &&
        node.properties.className.includes("kg-bookmark-thumbnail")
      ) {
        boomarkCardData.thumbnail = node.children[0].properties.src;
      }
    });
    return {
      type: "html",
      value: `<BookmarkCard title="${boomarkCardData.title}" description="${boomarkCardData.description}" author="${boomarkCardData.author}" publisher="${boomarkCardData.publisher}" thumbnail="${boomarkCardData.thumbnail}" url="${boomarkCardData.url}" ></BookmarkCard>`,
    };
  } else {
    visit(node, function(node) {
      if (node.tagName && node.tagName === "svg") {
        delete node.properties["xmlnsXLink"];
      }
    });
    return h(
      node,
      "html",
      toHtml(node, {
        space: "html",
        closeSelfClosing: true,
        allowDangerousHtml: true,
      })
    );
  }
}

module.exports = {
  abbr,
  b,
  cite,
  dfn,
  i,
  ins,
  kbd,
  mark,
  q,
  del,
  samp,
  small,
  sub,
  sup,
  u,
  iframe,
  figcaption,
  video,
  audio,
  figure
};
