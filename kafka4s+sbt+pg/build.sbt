import Dependencies._

ThisBuild / scalaVersion     := "2.13.12"
ThisBuild / version          := "0.1.0-SNAPSHOT"
ThisBuild / organization     := "com.example"
ThisBuild / organizationName := "example"

lazy val root = (project in file("."))
  .settings(
    name := "boilerplate",
    assembly / mainClass := Some("example.Hello"),
    libraryDependencies ++= Seq(
      munit % Test,
      scalaLogging,
      logback,
    ),
  )
  
ThisBuild / assemblyMergeStrategy := {
  case _ => MergeStrategy.first
}

// ThisBuild / assembly / mainClass := Some("example.Hello")

// See https://www.scala-sbt.org/1.x/docs/Using-Sonatype.html for instructions on how to publish to Sonatype.
