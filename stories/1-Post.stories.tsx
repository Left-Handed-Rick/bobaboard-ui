import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Card from "../src/common/Card";
import Header, { HeaderStyle } from "../src/post/Header";
import Footer, { modes as footerModes } from "../src/post/Footer";
import Post, { modes as postModes } from "../src/post/Post";
import Editor from "@bobaboard/boba-editor";

import oncelerAvatar from "./images/oncie.jpg";
import greedlerAvatar from "./images/greedler.jpg";
import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";

export default {
  title: "Post Preview",
  component: Card,
};

export const CardSimple = () => (
  <Card>
    <Editor
      editable={false}
      initialText={JSON.parse(
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      )}
      onTextChange={() => {
        console.log("changed!");
      }}
      focus={true}
      onIsEmptyChange={() => {
        console.log("empty!");
      }}
      onSubmit={() => {
        // This is for cmd + enter pressed while in the editor
        console.log("submit!");
      }}
    />
  </Card>
);

CardSimple.story = {
  name: "content card",
};

export const FooterStory = () => (
  <div>
    <Footer mode={footerModes.CREATE} />
    <Footer mode={footerModes.VIEW} />
    <style jsx>
      {`
        div {
          max-width: 500px;
          margin-top: 25px;
        }
        div > :global(div) {
          margin-top: 15px;
          background-color: pink;
        }
      `}
    </style>
  </div>
);

FooterStory.story = {
  name: "footer",
};

export const HeaderStory = () => (
  <div>
    <Header
      secretIdentity={{
        name: "Good Onceler",
        avatar: `/${oncelerAvatar}`,
      }}
      createdMessage="Posted on: 2019/05/14 at 7:34pm"
      size={HeaderStyle.REGULAR}
    />
    <Header
      secretIdentity={{ name: "Bad Onceler", avatar: `/${greedlerAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      size={HeaderStyle.COMPACT}
    />
    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      size={HeaderStyle.REGULAR}
    />
    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      size={HeaderStyle.REGULAR}
      forceHide
    />
    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      size={HeaderStyle.COMPACT}
    />
    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      size={HeaderStyle.COMPACT}
      forceHide
    />
    <style jsx>
      {`
        div {
          max-width: 500px;
          margin-top: 25px;
        }
        div > :global(div) {
          margin-top: 15px;
        }
      `}
    </style>
  </div>
);

HeaderStory.story = {
  name: "header",
};

export const EditableWithFooter = () => (
  <Post
    mode={postModes.CREATE}
    createdTime="2019/05/14 at 7:34pm"
    text={
      '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
    }
    secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
    userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
    onSubmit={() => console.log("click!")}
    onCancel={() => console.log("click!")}
    onNewContribution={() => console.log("click!")}
    onNewComment={() => console.log("click!")}
  />
);

export const NonEditable = () => (
  <Card>
    <Editor
      editable={false}
      initialText={JSON.parse(
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      )}
      onTextChange={() => {
        console.log("changed!");
      }}
      focus={true}
      onIsEmptyChange={() => {
        console.log("empty!");
      }}
      onSubmit={() => {
        // This is for cmd + enter pressed while in the editor
        console.log("submit!");
      }}
    />
    <Footer mode={footerModes.VIEW} />
  </Card>
);

EditableWithFooter.story = {
  name: "editable post",
};

NonEditable.story = {
  name: "non-editable post",
};
