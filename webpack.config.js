module: {
    rules: [
        {
        test: /\.s(c|a)ss$/,
        use: [
            'style-loader',
            'css-loader',
            {
            Requires sass-loader@^8.0.0
            options: {
                implementation: require('sass'),
                sassOptions: {
                    indentedSyntax: true
                },
            },
            },
        ],
        },
    ],
}