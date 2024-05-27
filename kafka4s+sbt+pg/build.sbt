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
  case PathList("META-INF", "services", rest @ _*) =>
    MergeStrategy.filterDistinctLines
  case PathList("META-INF", "MANIFEST.MF") =>
    MergeStrategy.discard
  case PathList("META-INF", rest @ _*) =>
    MergeStrategy.first
  case x => MergeStrategy.deduplicate
}

// See https://www.scala-sbt.org/1.x/docs/Using-Sonatype.html for instructions on how to publish to Sonatype.
