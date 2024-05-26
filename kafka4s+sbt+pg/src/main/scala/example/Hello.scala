package example

import com.typesafe.scalalogging.Logger

object Hello {
  def main(args: Array[String]): Unit = {
    val logger = Logger("DAVE")
    logger.info(greeting)
  }

  lazy val greeting: String = "hello"
}
