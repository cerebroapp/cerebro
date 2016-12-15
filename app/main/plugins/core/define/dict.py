# -*- coding: utf-8 -*-

import sys
import DictionaryServices

def main():
    searchword = sys.argv[1].decode('utf-8')
    wordrange = (0, len(searchword))
    dictresult = DictionaryServices.DCSCopyTextDefinition(None, searchword, wordrange)
    print dictresult.encode('utf-8')

if __name__ == '__main__':
    main()
