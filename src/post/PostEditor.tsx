import React from "react";

import Header, { HeaderStyle } from "./Header";
import EditorFooter from "./EditorFooter";
import Card from "../common/Card";
import Tags from "./Tags";
import { PostSizes, getPostWidth } from "./Post";
import Spinner from "../common/Spinner";
import Editor, {
  getAllImages,
  replaceImages,
  setTumblrEmbedFetcher as libSetFetcher,
  // @ts-ignore
} from "@bobaboard/boba-editor";

import Theme from "../theme/default";
import Button from "../common/Button";
import { faPortrait, faImage } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { TagsType } from "types";

export const setTumblrEmbedFetcher = libSetFetcher;

const prepareForSubmission = (
  text: string,
  uploadFunction: (src: string) => Promise<string>
) => {
  const delta = JSON.parse(text);
  const images = getAllImages(delta);
  return Promise.all(images.map((src: string) => uploadFunction(src))).then(
    (uploadedImages) => {
      const replacements = images.reduce(
        (obj: any, image: string, index: number) => {
          return {
            ...obj,
            [image]: uploadedImages[index],
          };
        },
        {}
      );
      replaceImages(delta, replacements);
      return JSON.stringify(delta);
    }
  );
};

const computeTags = (
  tags: TagsType[],
  newTag: TagsType,
  accentColor: string
): TagsType[] => {
  const indexableTags = tags.filter((tag) => tag.indexable);
  const whisperTags = tags.filter((tag) => !tag.indexable);

  if (newTag.name.startsWith("!")) {
    indexableTags.push({
      name: newTag.name.substring(1),
      color: accentColor,
      indexable: true,
    });
  } else {
    whisperTags.push({
      name: newTag.name,
      indexable: false,
    });
  }

  return [...indexableTags, ...whisperTags];
};

const PostEditor: React.FC<PostEditorProps> = (props) => {
  const [size, setNewSize] = React.useState(
    props.defaultSize || PostSizes.REGULAR
  );
  const [newText, setNewText] = React.useState(
    props.initialText ? props.initialText : ""
  );
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [tags, setTags] = React.useState<TagsType[]>([]);

  return (
    <>
      <div
        className={classnames("post-container", { centered: props.centered })}
      >
        <Card
          header={
            <div className="header">
              <Header
                secretIdentity={props.secretIdentity}
                userIdentity={props.userIdentity}
                size={HeaderStyle.REGULAR}
              >
                <Button
                  icon={size == PostSizes.REGULAR ? faImage : faPortrait}
                  onClick={() =>
                    setNewSize(
                      size == PostSizes.REGULAR
                        ? PostSizes.WIDE
                        : PostSizes.REGULAR
                    )
                  }
                  disabled={props.loading}
                >
                  {size == PostSizes.REGULAR ? "Enlarge" : "Shrink"}
                </Button>
              </Header>
            </div>
          }
          footer={
            <div className="footer">
              <Tags
                tags={tags}
                onTagsAdd={(tag: TagsType) =>
                  setTags(
                    computeTags(
                      tags,
                      tag,
                      props.accentColor || Theme.DEFAULT_ACCENT_COLOR
                    )
                  )
                }
                onTagsDelete={(tag: TagsType) => {
                  setTags(tags.filter((currentTag) => currentTag != tag));
                }}
                editable
                onSubmit={() => {
                  if (!isEmpty) {
                    props.onSubmit(
                      prepareForSubmission(
                        newText,
                        props.onImageUploadRequest
                      ).then((uploadedText) => ({
                        text: uploadedText,
                        large: size == PostSizes.WIDE,
                        tags,
                      }))
                    );
                  }
                }}
                accentColor={props.accentColor}
              />
              <div className="footer-actions">
                <EditorFooter
                  onSubmit={() =>
                    props.onSubmit(
                      prepareForSubmission(
                        newText,
                        props.onImageUploadRequest
                      ).then((uploadedText) => ({
                        text: uploadedText,
                        large: size == PostSizes.WIDE,
                        tags,
                      }))
                    )
                  }
                  onCancel={props.onCancel}
                  submittable={!props.loading && !isEmpty}
                  cancellable={!props.loading}
                />
              </div>
            </div>
          }
        >
          <div
            className={classnames("editor-container", {
              loading: props.loading,
            })}
          >
            <div className={"spinner"}>
              <Spinner />
            </div>
            <div className="editor">
              <Editor
                key="editor"
                initialText={
                  props.initialText ? JSON.parse(props.initialText) : ""
                }
                editable={!props.loading}
                focus={true}
                onSubmit={() =>
                  props.onSubmit(
                    prepareForSubmission(
                      newText,
                      props.onImageUploadRequest
                    ).then((uploadedText) => ({
                      text: uploadedText,
                      large: size == PostSizes.WIDE,
                    }))
                  )
                }
                onIsEmptyChange={(empty: boolean) => {
                  setIsEmpty(empty);
                }}
                onTextChange={(text: any) =>
                  setNewText(JSON.stringify(text.ops))
                }
              />
            </div>
          </div>
        </Card>
      </div>
      <style jsx>{`
        .post-container {
          max-width: ${getPostWidth(size)}px;
        }
        .post-container.centered {
          margin: 0 auto;
        }
        .header {
          border-radius: 15px 15px 0px 0px;
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          padding: 10px;
        }
        .footer {
          border-top: 1px dotted rgb(47, 47, 48);
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          border-radius: 0px 0px 15px 15px;
          padding: 5px;
        }
        .footer-actions {
          padding: 5px;
        }
        .editor-container {
          padding-top: 5px;
        }
        .editor {
          min-height: 300px;
        }
        .editor-container.loading .editor {
          opacity: 0.5;
        }
        .spinner {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          justify-content: center;
          align-items: center;
          z-index: 100;
          display: none;
        }

        .editor-container.loading .spinner {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default PostEditor;

export interface PostEditorProps {
  initialText?: string;
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity: {
    avatar: string;
    name: string;
  };
  loading?: boolean;
  defaultSize?: PostSizes;
  onImageUploadRequest: (imgUrl: string) => Promise<string>;
  onSubmit: (
    postPromise: Promise<{ text: string; large: boolean; tags?: TagsType[] }>
  ) => void;
  onCancel: () => void;
  centered?: boolean;
  accentColor?: string;
}
