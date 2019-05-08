import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  button.delete {
    width: 15px;
    position: relative;
    right: -225px;
    top: 10px;
    color: #9b65e6;
    cursor: pointer;
    background: none;
    border: none;
  }

  button.update {
    border: none;
    margin: 15px 30px;
    border-radius: 20px;
    color: #fff;
    background: #63f5b0;
    height: 35px;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;

    &:hover {
      background: #52d89f;
    }
  }

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    img {
      width: 64px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }
`;
