/**
 * Created by zenymax on 2/28/17.
 */
import webpack from 'webpack'
import webpackConfig from '../webpack.config.prod'
import colors from 'colors'

process.env.NODE_ENV = 'production'

console.log('Bundle is built for production'.green);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson()

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(err=>{
      console.log(err.red);
    })
  }

  if (jsonStats.hasWarnings) {
    console.log('Bundle is built with warning'.bold.yellow);
    jsonStats.warning.map(warning=>{
      console.log(warning.yellow);
    })
  }

  // console.log(`Weback stats: ${stats}`);

  console.log('App is built successfully and Server is ready for using...'.green);

  return 0
})
