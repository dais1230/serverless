import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Page
} from '@shopify/polaris';
import Header from './Header';

import rock from '../assets/img/rock.png'
import scissors from '../assets/img/scissors.png'
import paper from '../assets/img/paper.png'

const styles = {
  cursor: {
    cursor: 'pointer'
  }
}

const Purchase = () => {
  const [opponentHand, setOpponentHand] = useState('')
  const [opponentHandStatus, setOpponentHandStatus] = useState(false)
  const [result, setResult] = useState('')

  const handleClick = (userHand) => {
    let hand = getOpponentHand()

    setOpponentHand(hand)
    setOpponentHandStatus(true)

    switch (userHand) {
      case opponentHand:
        setResult('あいこ')
        break;
      case 'rock':
        (opponentHand === 'scissors') ? setResult('勝ち') : setResult('負け')
        break;
      case 'scissors':
        (opponentHand === 'paper') ? setResult('勝ち') : setResult('負け')
        break;
      case 'paper':
        (opponentHand === 'rock') ? setResult('勝ち') : setResult('負け')
        break;
      default:
        break;
    }
    console.log('result', result)
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

  return (
    <div>
      <Header />
      <Page>
        <p>じゃんけんに勝つと500円割引！</p>
        <p>じゃんけん... {result}</p>
        <img onClick={() => handleClick('rock')} src={rock} style={styles.cursor} height="100" alt="rock" />
        <img onClick={() => handleClick('scissors')} src={scissors} style={styles.cursor} height="100" alt="scissors" />
        <img onClick={() => handleClick('paper')} src={paper} style={styles.cursor} height="100" alt="paper" />
        {opponentHandStatus && <img src={showOpponentHand()} height="100" alt="opponent_hand" />}
      </Page>
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.productReducer.selectedProducts
})

export default connect(
  mapStateToProps
)(Purchase)
