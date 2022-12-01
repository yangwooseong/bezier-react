/* Internal dependencies */
import { styled } from 'Foundation'
import { TabsSize } from './Tabs.types'

interface ListProps {
  height: TabsSize
}

export const List = styled.div<ListProps>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${props => props.height}px;
  box-shadow: 0 -1px 0 0 ${props => props.foundation?.theme?.['bg-black-light']} inset;
`

export const TriggerWrapper = styled.div`
  display: flex;
`

export const TabActionWrapper = styled.div`
  display: flex;
`
