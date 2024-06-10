package example

import com.typesafe.scalalogging.Logger

class HelloSpec extends munit.FunSuite {
  test("say hello") {
    val logger = Logger("DAVE")
    logger.info("DAVE")
    assertEquals(Hello.greeting, "hello")
  }
}
