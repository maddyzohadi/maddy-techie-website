import { Node, mergeAttributes } from '@tiptap/core'

export interface ImageFigureOptions {
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageFigure: {
      insertImageFigure: (attrs: { src: string; alt: string; caption?: string }) => ReturnType
    }
  }
}

// A self-contained <figure><img/><figcaption/></figure> node — alt text is
// required at insert time (via the picker modal), caption is optional.
// Rendered the same way inside the editor and in the sanitized public HTML.
export const ImageFigure = Node.create<ImageFigureOptions>({
  name: 'imageFigure',
  group: 'block',
  atom: true,
  draggable: true,

  addOptions() {
    return { HTMLAttributes: {} }
  },

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: '' },
      caption: { default: '' },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="image-figure"]',
        getAttrs: (el) => {
          const element = el as HTMLElement
          const img = element.querySelector('img')
          const figcaption = element.querySelector('figcaption')
          return {
            src: img?.getAttribute('src') ?? null,
            alt: img?.getAttribute('alt') ?? '',
            caption: figcaption?.textContent ?? '',
          }
        },
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const figureAttrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      'data-type': 'image-figure',
    })
    return [
      'figure',
      figureAttrs,
      ['img', { src: node.attrs.src, alt: node.attrs.alt }],
      ...(node.attrs.caption ? [['figcaption', {}, node.attrs.caption] as const] : []),
    ]
  },

  addCommands() {
    return {
      insertImageFigure:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    }
  },
})

export default ImageFigure
