import endent from 'endent'
import { Prompt } from '../hooks/usePrompts'

type PromptWithoutId = Omit<Prompt, 'id' | 'children'> & {
  children?: PromptWithoutId[]
}

const prompts: PromptWithoutId[] = [
  {
    name: 'Review Selection',
    children: [
      {
        name: 'Summarize',
        prompt: endent`
          Read the following text and summarize it in less than half the original length.
        `,
      },
      {
        name: 'key takeaways',
        prompt: endent`
          Read the following text and identify the key takeaways in list format.
        `,
      },
      {
        name: 'Questions',
        prompt: endent`
          Read the following text and identify the key questions that it raises.
        `,
      },
    ],
  },
  {
    name: 'Edit Selection',
    children: [
      {
        name: 'Fix Grammar and Spelling',
        prompt: endent`
          Read the following text and fix any grammar and spelling mistakes.
        `,
      },
      {
        name: 'Change Tone',
        children: [
          {
            name: 'Formal',
            prompt: endent`
              Read the following text and make it more formal.
            `,
          },
          {
            name: 'Informal',
            prompt: endent`
              Read the following text and make it more informal.
            `,
          },
          {
            name: 'Neutral',
            prompt: endent`
              Read the following text and make it more neutral.
            `,
          },
          {
            name: 'Strong',
            prompt: endent`
              Read the following text and make it more strong and assertive.
            `,
          },
        ],
      },
      {
        name: 'Change Length',
        children: [
          {
            name: 'Shorter',
            prompt: endent`
              Read the following text and make it shorter.
            `,
          },
          {
            name: 'Longer',
            prompt: endent`
              Read the following text and make it longer.
            `,
          },
        ],
      },
      {
        name: 'Change Structure',
        children: [
          {
            name: 'Add Details',
            prompt: endent`
              Read the following text and add details to make it more informative.
            `,
          },
          {
            name: 'Add Examples',
            prompt: endent`
              Read the following text and add examples to make it more informative.
            `,
          },
          {
            name: 'Add Emphasis',
            prompt: endent`
              Read the following text and add emphasis to make it more impactful.
            `,
          },
        ],
      },
    ],
  },
  {
    name: 'Reply',
    children: [
      {
        name: 'Positive',
        prompt: endent`
          Read the following text and reply to it in a positive way.
        `,
      },
      {
        name: 'Negative',
        prompt: endent`
          Read the following text and reply to it in a negative way.
        `,
      },
    ],
  },
]

const recursiveAddId = (
  prompts: PromptWithoutId[],
  _parentId: string = '',
): Prompt[] => {
  return prompts.map((prompt) => {
    const id = crypto.randomUUID()
    return {
      id,
      ...prompt,
      children: prompt.children
        ? recursiveAddId(prompt.children, id)
        : undefined,
    }
  }) as Prompt[]
}

export const defaultPrompts = recursiveAddId(prompts)
