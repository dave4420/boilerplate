package example

import com.typesafe.scalalogging.Logger

object Hello {
  def main(args: Array[String]): Unit = {
    val j = new java.util.jar.JarFile(new java.io.File("target/scala-2.13/boilerplate-assembly-0.1.0-SNAPSHOT.jar"))
    val mainClassName = j.getManifest().getMainAttributes().getValue("Main-Class")
    val logger = Logger("DAVE")
    logger.info(mainClassName)
    logger.info(greeting)
  }

  lazy val greeting: String = "hello"
}
