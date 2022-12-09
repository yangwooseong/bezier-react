/* External dependencies */
import React, {
  useContext,
  forwardRef,
} from 'react'
import {
  isNil,
  noop,
} from 'lodash-es'

/* Internal dependencies */
import { Typography } from 'Foundation'
import {
  IconSize,
  OpenInNewIcon,
} from 'Components/Icon'
import { Text } from 'Components/Text'
import TabListContext from './TabListContext'
import {
  TabActionProps,
  TabSize,
} from './Tabs.types'
import * as Styled from './TabAction.styled'

const getTypoBy = (size: TabSize) => {
  switch (size) {
    case TabSize.L:
      return Typography.Size14
    case TabSize.Normal:
    case TabSize.XS:
    default:
      return Typography.Size13
  }
}

const getIconSizeBy = (size: TabSize) => {
  switch (size) {
    case TabSize.L:
      return IconSize.S
    default:
      return IconSize.XS
  }
}

export const TabAction = forwardRef(function TabAction({
  href,
  children,
  onClick = noop,
  ...rest
}: TabActionProps, forwardedRef: React.Ref<HTMLDivElement>,
) {
  const { size } = useContext(TabListContext)

  return (
    <Styled.Wrapper
      ref={forwardedRef}
      {...rest}
    >
      { isNil(href) ? (
        <Styled.ToolbarButton
          size={size}
          onClick={onClick}
        >
          <Text
            bold
            typo={getTypoBy(size)}
          >
            { children }
          </Text>
        </Styled.ToolbarButton>
      ) : (
        <Styled.ToolbarLink
          size={size}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text
            bold
            typo={getTypoBy(size)}
          >
            { children }
          </Text>
          <Styled.LinkIcon
            source={OpenInNewIcon}
            size={getIconSizeBy(size)}
          />
        </Styled.ToolbarLink>
      ) }
    </Styled.Wrapper>
  )
})