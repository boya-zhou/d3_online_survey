# coding: utf-8

import numpy as np
import pandas as pd
import scipy
import os
import scikits.bootstrap as bootstrap

"""
1. Merge all results
"""
def saveResults(resultFolder):
    """
    Write all results into one csv file.

    Parameters
    ----------
    resultFolder: results directory

    Returns
    -------

    """
    # os.chdir(resultFolder)
    resultList = os.listdir(resultFolder)
    with open('result.csv', 'w') as csvfile:
        csvfile.write('index,charttype,sysSet,userSet\n')
        for i in range(0, len(resultList)):
            with open('%s/%s' % (resultFolder, resultList[i]), 'r') as resultFile:
                for line in resultFile:
                    if ('charttype' in line) == False:
                        csvfile.write(line)

"""
2. Compute error
"""
# done in spreadsheet

"""
3. Compute 95% confidence intervals around the mean 
"""

# CIs = bootstrap.ci(data=treatment1, statfunction=scipy.mean) 

if __name__ == '__main__':
    resultFolder = './result'
    # saveResults(resultFolder)
    df = pd.read_csv('result.csv')
    barError = np.array((df[df['charttype'] == 'Bar'])['Error'])
    pieError = np.array((df[df['charttype'] == 'Pie'])['Error'])
    radialError = np.array((df[df['charttype'] == 'Radial'])['Error'])
    charttype = ['Bar', 'Pie', 'Radial']
    i = 0
    for e in [barError, pieError, radialError]:
        print '%s CI: %s' % (charttype[i], bootstrap.ci(data=e, statfunction=scipy.mean))
        i += 1