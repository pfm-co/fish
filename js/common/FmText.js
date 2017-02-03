/**
 * Created by Arman on 2016-11-01.
 *
 * @flow
 */



'use strict';

import React from 'react';
import ReactNative, {StyleSheet, Dimensions} from 'react-native';
import FmColors from './FmColors';

export function Text({style, ...props}: Object): ReactElement {
    return <ReactNative.Text style={[styles.font, style]} {...props} />;
}

export function Heading1({style, ...props}: Object): ReactElement {
    return <ReactNative.Text style={[styles.font, styles.h1, style]} {...props} />;
}

export function Heading2({style, ...props}: Object): ReactElement {
    return <ReactNative.Text style={[styles.font, styles.h2, style]} {...props} />;
}

export function Paragraph({style, ...props}: Object): ReactElement {
    return <ReactNative.Text style={[styles.font, styles.p, style]} {...props} />;
}

const scale = Dimensions.get('window').width / 375;

function normalize(size: number): number {
    return Math.round(scale * size);
}

const styles = StyleSheet.create({
    font: {
        fontFamily: require('../env').fontFamily,
    },
    h1: {
        fontSize: normalize(24),
        lineHeight: normalize(27),
        color: FmColors.darkText,
        fontWeight: 'bold',
        letterSpacing: -1,
    },
    h2: {
        fontSize: normalize(18),
        lineHeight: normalize(20),
        color: FmColors.darkText,
        fontWeight: 'bold',
        letterSpacing: -1,
    },
    p: {
        fontSize: normalize(15),
        lineHeight: normalize(23),
        color: FmColors.lightText,
    },
});
