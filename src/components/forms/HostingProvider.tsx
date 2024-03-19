import React from 'react'
import {View} from 'react-native'
import {msg} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {isAndroid} from '#/platform/detection'
import {atoms as a, useTheme} from '#/alf'
import {Globe_Stroke2_Corner0_Rounded as Globe} from '#/components/icons/Globe'
import {PencilLine_Stroke2_Corner0_Rounded as Pencil} from '#/components/icons/Pencil'
import {useDialogControl} from '../Dialog'
import {Text} from '../Typography'
import {ServerInputDialog} from '#/view/com/auth/server-input'
import {toNiceDomain} from '#/lib/strings/url-helpers'
import {Button} from '../Button'

export function HostingProvider({
  serviceUrl,
  onSelectServiceUrl,
  onOpenDialog,
}: {
  serviceUrl: string
  onSelectServiceUrl: (provider: string) => void
  onOpenDialog?: () => void
}) {
  const serverInputControl = useDialogControl()
  const t = useTheme()
  const {_} = useLingui()

  const onPressSelectService = React.useCallback(() => {
    serverInputControl.open()
    if (onOpenDialog) {
      onOpenDialog()
    }
  }, [onOpenDialog, serverInputControl])

  return (
    <>
      <ServerInputDialog
        control={serverInputControl}
        onSelect={onSelectServiceUrl}
      />
      <Button
        label={toNiceDomain(serviceUrl)}
        accessibilityHint={_(msg`Press to change hosting provider`)}
        variant="solid"
        color="secondary"
        style={[
          a.w_full,
          a.flex_row,
          a.align_center,
          a.rounded_sm,
          a.px_md,
          a.gap_xs,
          {paddingVertical: isAndroid ? 14 : 9},
        ]}
        onPress={onPressSelectService}>
        {({hovered}) => (
          <>
            <View style={a.pr_xs}>
              <Globe
                size="md"
                fill={hovered ? t.palette.contrast_800 : t.palette.contrast_500}
              />
            </View>
            <Text style={[a.text_md]}>{toNiceDomain(serviceUrl)}</Text>
            <View
              style={[
                a.rounded_sm,
                hovered ? t.atoms.bg_contrast_300 : t.atoms.bg_contrast_100,
                {marginLeft: 'auto', left: 6, padding: 6},
              ]}>
              <Pencil
                size="sm"
                style={{
                  color: hovered
                    ? t.palette.contrast_800
                    : t.palette.contrast_500,
                }}
              />
            </View>
          </>
        )}
      </Button>
    </>
  )
}
