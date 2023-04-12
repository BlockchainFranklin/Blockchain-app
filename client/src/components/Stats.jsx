import React from 'react'

const Stats = () => {
  return (
    <div>
      <AnimatedBorderView
      startAnimation={ready}
      style={styles.box}
      children={
        <Text style={{ textAlign: 'center', margin: 10 }}>Testing </Text>
      }
    ></AnimatedBorderView>
    </div>
  )
}

export default Stats