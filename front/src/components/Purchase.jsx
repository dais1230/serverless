import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Page } from '@shopify/polaris';
import Header from './Header';

import rock from '../assets/img/rock.png'
import scissors from '../assets/img/scissors.png'
import paper from '../assets/img/paper.png'

const styles = {
  cursor: {
    cursor: 'pointer',
    float: 'left'
  },
  vs: {
    float: 'left',
    fontSize: '30px',
    padding: '0 30px'
  },
  totalPrice: {
    marginTop: '100px'
  }
}

const Purchase = ({ selectedProducts }) => {
  const [opponentHand, setOpponentHand] = useState('')
  const [opponentHandStatus, setOpponentHandStatus] = useState(false)
  const [result, setResult] = useState('')

  const handleClick = (userHand) => {
    if ((result !== "勝ち") && (result !== "負け")) {
      let hand = getOpponentHand()

      setOpponentHand(hand)
      setOpponentHandStatus(true)

      switch (userHand) {
        case hand:
          setResult('あいこ')
          break;
        case 'rock':
          (hand === 'scissors') ? setResult('勝ち') : setResult('負け')
          break;
        case 'scissors':
          (hand === 'paper') ? setResult('勝ち') : setResult('負け')
          break;
        case 'paper':
          (hand === 'rock') ? setResult('勝ち') : setResult('負け')
          break;
        default:
          break;
      }
    }
  }

  const getOpponentHand = () => {
    let hands = ['rock', 'scissors', 'paper']
    let num = Math.floor(Math.random() * Math.floor(3))

    return hands[num]
  }

  const showOpponentHand = () => {
    switch (opponentHand) {
      case 'rock':
        return rock
      case 'scissors':
        return scissors
      case 'paper':
        return paper
      default:
        break;
    }
  }

  const showCall = () => {
    if (result === "") {
      return "じゃんけん..."
    } else if (result === 'あいこ') {
      return "あいこで..."
    }
  }


  const totalPrice = () => {
    let totalPrice = 0
    selectedProducts.map(sp => {
      return totalPrice += parseInt(sp.price, 10)
    })
    if (result === "勝ち") {
      return (totalPrice - 500)
    } else {
      return totalPrice
    }
  }

  return (
    <div>
      <Header />
      <Page>
        <p>じゃんけんに勝つと500円割引！</p>
        <p>{showCall()} {result} {(result === "勝ち") && <p>500円割引！</p>} </p>
        <img onClick={() => handleClick('rock')} src={rock} style={styles.cursor} height="100" alt="rock" />
        <img onClick={() => handleClick('scissors')} src={scissors} style={styles.cursor} height="100" alt="scissors" />
        <img onClick={() => handleClick('paper')} src={paper} style={styles.cursor} height="100" alt="paper" />
        {opponentHandStatus &&
          <div>
            <div>
              <p style={styles.vs}>vs</p>
              <img src={showOpponentHand()} height="100" alt="opponent_hand" />
            </div>
            {((result === "勝ち") || (result === "負け")) &&
              <div>
                <p style={styles.totalPrice}>合計金額 {totalPrice()}円</p>
                <Button><Link to={'/complete'}>購入</Link></Button>
              </div>
            }
          </div>
        }
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedProducts: state.productReducer.selectedProducts
})

export default connect(
  mapStateToProps
)(Purchase)
