import React, { FC, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core'

import { useStatusBar } from 'hooks/useStatusBar'

import { useT } from 'res/i18n'

import { FormLayout } from 'library/layouts/FormLayout'
import { Label } from 'library/components/Label'

import { AddRelationTaskStackParamList } from '../AddRelationTask.navigator'
import { Avatar } from 'library/components/Avatar'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { Info } from 'library/components/Info'
import { Task } from 'screens/app/components/Task'
import { AddRelationTaskContext } from '../AddRelationTask.context'

type ChooseNameRouteProps = RouteProp<AddRelationTaskStackParamList, 'Recap'>

const Avatars: FC<{ me: User; partner: User }> = ({ me, partner }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Avatar
      size="small"
      avatar={me.avatarUrl}
      firstname={me.firstName}
      backgroundColor="dark200"
      avatarColor="white"
      borderColor="white"
      borderWidth={1}
      containerStyle={{ marginRight: 8 }}
    />
    <Text style={{ fontSize: 26 }}>💌</Text>
    <Avatar
      size="small"
      avatar={partner.avatarUrl}
      firstname={partner.firstName}
      backgroundColor="dark200"
      avatarColor="white"
      borderColor="white"
      borderWidth={1}
      containerStyle={{ marginLeft: 8 }}
    />
  </View>
)

export const RecapScreen = () => {
  useStatusBar('dark-content')
  const { t } = useT()
  const { me, partner } = useContext(UsersContext)
  const { addRelationTask } = useContext(AddRelationTaskContext)
  const navigation = useNavigation()
  const route = useRoute<ChooseNameRouteProps>()

  const { task } = route.params

  const handleOnBack = () => {
    return navigation.goBack()
  }

  const handleOnFinish = () => {
    addRelationTask(task)
    navigation.navigate('Home')
  }

  return (
    <FormLayout
      containerStyle={styles.formContainer}
      onBackAction={handleOnBack}
      onFinishAction={handleOnFinish}
      label={
        <Label
          primary={t('app:screen:addRelationTask:recap:label:primary')}
          secondary={t('app:screen:addRelationTask:recap:label:secondary')}
        />
      }
      bottomInfo={
        <View style={{ paddingHorizontal: 24 }}>
          <Info
            color="dark200"
            primary={t('app:screen:addRelationTask:recap:info:primary')}
            secondary={t('app:screen:addRelationTask:recap:info:secondary')}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <Avatars me={me} partner={partner} />
        <Text style={styles.youAskTo}>
          {t('app:screen:addRelationTask:youAskTo', {
            firstName: partner.firstName,
          })}
        </Text>

        <Task task={task} disabled />
      </View>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    marginTop: 52,
  },
  youAskTo: {
    marginVertical: 16,
  },
  strongText: {
    fontWeight: '500',
  },
})
