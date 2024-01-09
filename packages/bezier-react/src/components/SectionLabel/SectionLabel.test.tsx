import React from 'react'

import {
  TagIcon,
  ToolIcon,
} from '@channel.io/bezier-icons'

import { render } from '~/src/utils/test'

import { BUTTON_TEST_ID } from '~/src/components/Button/Button'
import { DIVIDER_TEST_ID } from '~/src/components/Divider/Divider'
import { HELP_TEST_ID } from '~/src/components/Help/Help'
import { ICON_TEST_ID } from '~/src/components/Icon/Icon'

import SectionLabel, {
  SECTION_LABEL_TEST_CONTENT_ID,
  SECTION_LABEL_TEST_ID,
  SECTION_LABEL_TEST_LEFT_CONTENT_ID,
  SECTION_LABEL_TEST_RIGHT_CONTENT_ID,
} from './SectionLabel'
import type SectionLabelProps from './SectionLabel.types'

describe('SectionLabel', () => {
  const defaultProps: SectionLabelProps = {}

  function renderComponent(props?: Partial<SectionLabelProps>) {
    return render(<SectionLabel {...defaultProps} {...props} />)
  }

  it('renders element content as it is', () => {
    const { getByTestId } = renderComponent({ content: <div id="i-am-sectionlabel-content-id" /> })
    const content = getByTestId(SECTION_LABEL_TEST_CONTENT_ID)

    expect(content.children.length).toBe(1)
    expect(content.children.item(0)?.id).toBe('i-am-sectionlabel-content-id')
  })

  it('does not render left content if given null', () => {
    const { getByTestId } = renderComponent()
    expect(() => getByTestId(SECTION_LABEL_TEST_LEFT_CONTENT_ID)).toThrowError()
  })

  it('renders left content with specified icon and default icon color', () => {
    const { getByTestId } = renderComponent({ leftContent: { icon: TagIcon } })
    const leftContent = getByTestId(SECTION_LABEL_TEST_LEFT_CONTENT_ID)

    const leftIcon = leftContent.children.item(0)

    expect(leftIcon).toHaveAttribute('data-testid', ICON_TEST_ID)
    expect(leftIcon).toHaveStyle('--b-icon-color: var(--txt-black-dark)')
  })

  it('renders left content with specified icon and icon color', () => {
    const { getByTestId } = renderComponent({ leftContent: { icon: TagIcon, iconColor: 'bgtxt-orange-normal' } })
    const leftContent = getByTestId(SECTION_LABEL_TEST_LEFT_CONTENT_ID)

    const leftIcon = leftContent.children.item(0)

    expect(leftIcon).toHaveAttribute('data-testid', ICON_TEST_ID)
    expect(leftIcon).toHaveStyle('--b-icon-color: var(--bgtxt-orange-normal)')
  })

  it('renders left content as it is', () => {
    const { getByTestId } = renderComponent({ leftContent: <div id="foo" /> })
    const leftContent = getByTestId(SECTION_LABEL_TEST_LEFT_CONTENT_ID)

    const leftIcon = leftContent.children.item(0)
    expect(leftIcon?.id).toBe('foo')
  })

  it('renders help icon if help prop exists', () => {
    const { getByTestId } = renderComponent({
      help: <div>happy</div>,
    })
    const helpContent = getByTestId(HELP_TEST_ID)
    expect(helpContent).toBeInTheDocument()
  })

  it('does not render right content if given null', () => {
    const { getByTestId } = renderComponent()
    expect(() => getByTestId(SECTION_LABEL_TEST_RIGHT_CONTENT_ID)).toThrowError()
  })

  it('does not render right content if given empty array', () => {
    const { getByTestId } = renderComponent({ rightContent: [] })
    expect(() => getByTestId(SECTION_LABEL_TEST_RIGHT_CONTENT_ID)).toThrowError()
  })

  it('renders right content as button if only icon is specified', () => {
    const { getByTestId } = renderComponent({ rightContent: { icon: TagIcon } })
    const rightContent = getByTestId(SECTION_LABEL_TEST_RIGHT_CONTENT_ID)

    expect(rightContent.children.length).toBe(1)

    const rightButton = rightContent.children.item(0)

    expect(rightButton).toHaveAttribute('data-testid', BUTTON_TEST_ID)
  })

  it('renders multiple right contents, and item with iconColor is not rendered as button', () => {
    const { getByTestId } = renderComponent({
      rightContent: [
        { icon: TagIcon },
        { icon: ToolIcon, iconColor: 'bgtxt-green-normal' },
      ],
    })
    const rightContent = getByTestId(SECTION_LABEL_TEST_RIGHT_CONTENT_ID)

    expect(rightContent.children.length).toBe(2)

    expect(rightContent.children.item(0)).toHaveAttribute('data-testid', BUTTON_TEST_ID)

    expect(rightContent.children.item(1)).not.toHaveAttribute('data-testid', BUTTON_TEST_ID)
  })

  it('renders right content as it is', () => {
    const { getByTestId } = renderComponent({
      rightContent: [
        <div key="foo" id="foo" />,
        <div key="bar" id="bar" />,
        <div key="foobar" id="foobar" />,
      ],
    })
    const rightContent = getByTestId(SECTION_LABEL_TEST_RIGHT_CONTENT_ID)

    expect(rightContent.children.length).toBe(3)

    expect(rightContent.children.item(0)?.id).toBe('foo')
    expect(rightContent.children.item(1)?.id).toBe('bar')
    expect(rightContent.children.item(2)?.id).toBe('foobar')
  })

  it('renders with divider if the divider prop is true', () => {
    const { getByTestId } = renderComponent({
      divider: true,
    })

    const content = getByTestId(SECTION_LABEL_TEST_ID)

    expect(content.children.item(0)).toHaveAttribute('data-testid', DIVIDER_TEST_ID)
  })
})
