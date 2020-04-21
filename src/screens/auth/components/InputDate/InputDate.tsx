import React, { FC, useState, useRef, useEffect } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

type InputDateProps = {
  onChange?: (date: string) => void
}

export const InputDate: FC<InputDateProps> = ({ onChange }) => {
  const textInput = useRef()
  const { t } = useT()

  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')

  useEffect(() => {
    onChange(`${year}/${month}/${day}`)
  }, [day, month, year])

  const onPressCode = () => {
    if (textInput === null) return

    // @ts-ignore
    textInput.current.focus()
  }

  const isFilled = (value: string) => value.length > 0

  const onChangeText = (value: string) => {
    if (typeof value[0] === 'string') {
      setDay(value.substr(0, 2))
    } else {
      setDay('')
    }

    if (typeof value[2] === 'string') {
      setMonth(value.substr(2, 2))
    } else {
      setMonth('')
    }

    if (typeof value[4] === 'string') {
      setYear(value.substr(4, 4))
    } else {
      setYear('')
    }
  }

  const dayValuesStyle = {
    ...styles.placeholder,
    ...(isFilled(day) ? styles.value : {}),
  }

  const monthValuesStyle = {
    ...styles.placeholder,
    ...(isFilled(month) ? styles.value : {}),
  }

  const yearValuesStyle = {
    ...styles.placeholder,
    ...(isFilled(year) ? styles.value : {}),
  }

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={onPressCode}
          activeOpacity={1}
          style={styles.dateContainer}
        >
          <View style={{ ...styles.container, width: 55 }}>
            <Text style={styles.label}>{t('input:date:day')}</Text>
            <Text style={dayValuesStyle}>
              {day || t('input:date:day:placeholder')}
            </Text>
          </View>

          <View style={{ ...styles.container, width: 55 }}>
            <Text style={styles.label}>{t('input:date:month')}</Text>
            <Text style={monthValuesStyle}>
              {month || t('input:date:month:placeholder')}
            </Text>
          </View>

          <View style={{ ...styles.container, width: 80 }}>
            <Text style={styles.label}>{t('input:date:year')}</Text>
            <Text style={yearValuesStyle}>
              {year || t('input:date:year:placeholder')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TextInput
        ref={textInput}
        autoFocus
        caretHidden={true}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        maxLength={8}
        style={styles.input}
      />
    </>
  )
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 18,
    marginLeft: 18,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  placeholder: {
    color: colors.grey100,
    fontSize: 28,
  },
  value: {
    color: colors.dark100,
  },
  input: {
    fontSize: 0,
    height: 1,
    opacity: 0,
    margin: 0,
    padding: 0,
  },
})
