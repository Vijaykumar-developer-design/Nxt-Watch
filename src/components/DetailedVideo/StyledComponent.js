import styled from 'styled-components'

export const SaveButtonEl = styled.button`
  color: ${props => (props.btnCondition ? 'gray' : 'blue')};
  background-color: inherit;
  border: none;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 25px;
`

export const LikeBtnEl = styled.button`
  color: ${props => (props.like ? '#2563eb' : '#64748b')};
  background-color: inherit;
  border: none;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 25px;
`
export const DislikeBtnEl = styled.button`
  color: ${props => (props.disLike ? '#2563eb' : '#64748b')};
  background-color: inherit;
  border: none;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 25px;
`
