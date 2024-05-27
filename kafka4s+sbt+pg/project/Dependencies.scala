import sbt._

object Dependencies {
  lazy val munit = "org.scalameta" %% "munit" % "0.7.29"
  lazy val scalaLogging = "com.typesafe.scala-logging" %% "scala-logging" % "3.9.5"
  lazy val logback = "ch.qos.logback" % "logback-classic" % "1.3.5"
  lazy val logbackJson = "ch.qos.logback.contrib" % "logback-json-classic" % "0.1.5"
  lazy val logbackJackson = "ch.qos.logback.contrib" % "logback-jackson" % "0.1.5"
  lazy val jacksonDatabind = "com.fasterxml.jackson.core" % "jackson-databind" % "2.17.1"
}
