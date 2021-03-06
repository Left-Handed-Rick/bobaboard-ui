import React from "react";
//import { linkTo } from "@storybook/addon-links";
import PostEditor, { setTumblrEmbedFetcher } from "../src/post/PostEditor";
import Modal from "../src/common/Modal";
import Button from "../src/common/Button";

import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";

export default {
  title: "Post Editor",
  component: PostEditor,
};

setTumblrEmbedFetcher((url: string) => {
  console.log(`""Fetching"" from ${url}`);
  return Promise.resolve({
    url:
      "https://turquoisemagpie.tumblr.com/post/618042321716510720/eternity-stuck-in-white-noise-can-drive-you-a",
    href:
      "https://embed.tumblr.com/embed/post/2_D8XbYRWYBtQD0A9Pfw-w/618042321716510720",
    did: "22a0a2f8b7a33dc50bbf5f49fb53f92b181a88aa",
  });
});

export const EditableWithFooter = () => (
  <PostEditor
    secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
    userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
    onSubmit={(text) => console.log(text)}
    onCancel={() => console.log("click!")}
    centered
  />
);

EditableWithFooter.story = {
  name: "editable",
};

export const EditableInModal = () => (
  <Modal isOpen={true}>
    <PostEditor
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onSubmit={(text) => console.log(text)}
      onCancel={() => console.log("click!")}
      centered
    />
  </Modal>
);

EditableInModal.story = {
  name: "editable with modal",
};

export const LongEditableInModal = () => (
  <Modal isOpen={true}>
    <PostEditor
      initialText={
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      }
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onSubmit={(text) => console.log(text)}
      onCancel={() => console.log("click!")}
      centered
    />
  </Modal>
);

LongEditableInModal.story = {
  name: "long editable with modal",
};

export const Loading = () => {
  const [loading, setLoading] = React.useState(true);
  return (
    <div>
      <PostEditor
        initialText={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onSubmit={(text) => console.log(text)}
        onCancel={() => console.log("click!")}
        loading={loading}
        centered
      />
      <Button onClick={() => setLoading(!loading)}>Change Load State</Button>
    </div>
  );
};

Loading.story = {
  name: "loading state",
};
