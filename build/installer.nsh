!macro customInstall
  DetailPrint "Register cerebro URI Handler"
  DeleteRegKey HKCR "cerebro"
  WriteRegStr HKCR "cerebro" "" "URL:cerebro"
  WriteRegStr HKCR "cerebro" "URL Protocol" ""
  WriteRegStr HKCR "cerebro\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
  WriteRegStr HKCR "cerebro\shell" "" ""
  WriteRegStr HKCR "cerebro\shell\Open" "" ""
  WriteRegStr HKCR "cerebro\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend
