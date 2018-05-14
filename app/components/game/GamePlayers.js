'use strict'

import teamMap from '../../utils/team-map'

import React, {
  Component,
  StyleSheet,
  PropTypes,
  Text,
  View,
  ScrollView,
  ListView,
  Image
} from 'react-native'

class PlayerRow extends Component {
  render () {
    const {players, index, last} = this.props
    const homeTeamLogo = teamMap['common'].ball
    
    const player = players[index - 1]
    const isHomeEvent = player.home_away == 'h'
    const isAwayEvent = player.home_away == 'a'

    // home/away player name
    var playerNameHome = ' '
    var playerNameAway = ' '
    if (isHomeEvent) 
    {
      playerNameHome = player.player
    }
    else
    {
      playerNameAway = player.player
    }

    // ball/yellow card
    var imageSouce = player.event == 'GOAL' ? teamMap['common'].ball : teamMap['common'].yellowCard

    // score
    var homeScore = 0
    var awayScore = 0
    for (let index = 0; index < players.length; index++) {
      const player = players[index];
      
      if (isHomeEvent && player.event == 'GOAL')
        homeScore++

      if (isAwayEvent && player.event == 'GOAL')
        awayScore++
    }

    return (
      <View style={newStyles.container}>
        <View style={newStyles.minute}><Text>{player.time}'</Text></View>
        <View style={newStyles.content}>
          <View style={newStyles.player}>
            <Text style={newStyles.playerName}>{playerNameHome}</Text>
            {isHomeEvent && <Image style={newStyles.image} source={imageSouce}/>}
          </View>
          <View style={newStyles.score}>
            {player.event == 'GOAL' && <Text>{homeScore} - {awayScore}</Text>}
          </View>
          <View style={newStyles.player}>
            {isAwayEvent && <Image style={newStyles.image} source={imageSouce}/>}
            <Text style={newStyles.playerName}>{playerNameAway}</Text>
          </View>
        </View>
        <View style={newStyles.minute}></View>
      </View>
    )
  }
}

PlayerRow.propTypes = {
  player: PropTypes.object,
  last: PropTypes.bool
}

export default class GamePlayers extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount () {
    const {detail} = this.props
    this.updateDataSource(detail)
  }

  componentWillReceiveProps (props) {
    const {detail} = props
    this.updateDataSource(detail)
  }

  updateDataSource (detail) {
    const {dataSource} = this.state
    let rows = Object.assign([], detail.player)
    rows.unshift({}) // unshift an empty object, use it as title row

    this.setState({
      dataSource: dataSource.cloneWithRows(rows)
    })
  }

  renderTitle (index) {
    return (
      <View style={[styles.playerBox, styles.titleRow]} key={index}>
        <View style={styles.p2} />
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>P</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>PTS</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>AST</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>REB</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>FG</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>BLK</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>STL</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>3PT</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>FT</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>TO</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>PF</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>+/-</Text></View></View>
        <View style={[styles.p1, styles.lastP1]}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>MIN</Text></View></View>
      </View>
    )
  }

  renderRow (player, _, i) {
    const index = parseInt(i, 10)
    const {detail} = this.props

    if (index === 0) {
      return (<View/>)//this.renderTitle(index)
    }
    return (<PlayerRow players={detail.player} index={index} key={index} last={index === detail.player.length} />)
  }

  render () {
    const {dataSource} = this.state
    const horizontal = false
    return (
      /**
       * @TODO: I don't know what is the best practice to scroll both horizontal and vertical
       * The method I used here may not adaptable
       */
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={horizontal}
          style={styles.scrollView}>
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)}
            style={styles.listView} />
        </ScrollView>
      </View>
    )
  }
}

GamePlayers.propTypes = {
  detail: PropTypes.object
}

const newStyles = StyleSheet.create({
  container: {
    height: 30,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 0,
    backgroundColor: '#cfcfcf',
    flexDirection: 'row'
  },
  minute: {
    width: 30,
    marginLeft:8,
    // height:30,
    backgroundColor: 'yellow'
  },
  content: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerName: {
    backgroundColor: 'red',
    fontSize: 12
  },
  image: {
    width: 10,
    height: 10
  },
  score: {
    width: 30,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
})

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 13,
    position: 'relative'
  },
  // Scroll
  scrollView: {
    // flex: 1,
    // height: 10,
    // width: 400
  },
  // List
  listView: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 0,
    marginRight: 10,
    marginLeft: 10,
    // height : 100,
    // width: 800
  },
  // Player box (tr)
  titleRow: {
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 2,
    height: 0,
    borderStyle: 'solid'
  },
  playerBox: {
    alignItems: 'stretch',
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 30
  },
  playerBoxLast: {
    borderBottomWidth: 0
  },
  // Every box (td)
  title: {
    alignSelf: 'center',
    color: '#7F7F7F',
    fontSize: 12
  },
  pName: {
    color: '#222',
    fontSize: 12,
    paddingLeft: 5
  },
  dataBox: {
    alignSelf: 'center',
    color: '#222',
    fontSize: 11
  },
  p1: {
    alignItems: 'center',
    borderRightColor: '#c2c2c2',
    borderRightWidth: 1,
    flex: 1,
    flexDirection: 'row'
  },
  lastP1: {
    borderRightWidth: 0
  },
  p2: {
    borderRightColor: '#c2c2c2',
    borderRightWidth: 1,
    flex: 2,
    flexDirection: 'row'
  },
  p2Name: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
