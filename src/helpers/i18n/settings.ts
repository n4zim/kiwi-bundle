import { Language } from "../../types/names"
import { i18nMarkdownCompiler, i18nSettingsMarkdownObject, i18nSettingsCompilerCallback, i18nMarkdownCompilerOptions } from "../../types/i18n"

// tslint:disable-next-line: class-name
export class i18nSettings {
  private static defaultLanguage: Language = Language.ENGLISH
  private static language: Language = i18nSettings.defaultLanguage
  private static markdownCompiler?: i18nMarkdownCompiler

  static setCurrentLanguage(language: Language) {
    this.language = language
  }

  static getDefaultLanguage() {
    return this.defaultLanguage
  }

  static setDefaultLanguage(language: Language) {
    this.defaultLanguage = language
  }

  static setCurrentLanguageFromString(locale: string) {
    switch (locale) {
    case Language.FRENCH: return this.setCurrentLanguage(Language.FRENCH)
    default: return this.setCurrentLanguage(this.defaultLanguage)
    }
  }

  static getCurrentLanguage() {
    return this.language
  }

  static setMarkdownCompiler<Output>(compiler: i18nMarkdownCompiler<Output>) {
    this.markdownCompiler = compiler
  }

  private static extractStringIndexes(text: string, indexes: i18nSettingsMarkdownObject, regex: RegExp, compiler: i18nSettingsCompilerCallback): i18nSettingsMarkdownObject {
    let match: RegExpExecArray
    while((match = regex.exec(text) as any) !== null) {
      const objectIndex = (Object.keys(indexes) as any[]).reduce<number>((result, index: number) => {
        if(result === -1 && match.index >= index && match.index < indexes[index].end) {
          result = index
        }
        return result
      }, -1)

      if(objectIndex === -1) {
        indexes[match.index] = { end: match.index + match[0].length, value: compiler(match) }
      } else {
        indexes[objectIndex].value = compiler(match, indexes[objectIndex].value)
      }
    }
    return indexes
  }

  static compileMarkdown<Output = any>(id: string, text: string): Output[] {
    if(typeof this.markdownCompiler === "undefined") {
      return [ text as any ]
    }

    let outputIndexes: i18nSettingsMarkdownObject = {}

    outputIndexes = this.extractStringIndexes(text, outputIndexes, /\*\*(.*?)\*\*/g, (match, children) => {
      const bold = true
      if(typeof children !== "undefined") {
        children.text = match[1]
        children.bold = bold
        return children
      }
      return { text: match[1], bold, options: {} }
    })

    outputIndexes = this.extractStringIndexes(text, outputIndexes, /\[(.*?)\]\((.*?)\)(\{.*?\})?/g, (match, children) => {
      const link = match[2]
      let options: i18nMarkdownCompilerOptions = {}
      if(typeof match[3] !== "undefined") {
        options = match[3].slice(1, -1).split(",").reduce<i18nMarkdownCompilerOptions>((result, current) => {
          const split = current.split(":")
          result[split[0]] = split[1]
          return result
        }, {})
      }
      if(typeof children !== "undefined") {
        children.text = match[1]
        children.link = link
        children.options = Object.assign(children.options, options)
        return children
      }
      return { text: match[1], link, options }
    })

    let lastChar = 0

    const output = (Object.keys(outputIndexes) as any[]).reduce((result, index: number) => {
      if(lastChar < index) {result.push(text.slice(lastChar, index))}
      const currentIndex = outputIndexes[index]
      let currentOutput: Output = currentIndex.value.text as any
      if(typeof currentIndex.value.link !== "undefined") {
        const linkCompiler = (this.markdownCompiler as i18nMarkdownCompiler<Output>).link
        currentOutput = linkCompiler(`${id}-${index}-link`, currentIndex.value.link, currentOutput, currentIndex.value.options)
      }
      if(typeof currentIndex.value.bold !== "undefined" && currentIndex.value.bold) {
        const boldCompiler = (this.markdownCompiler as i18nMarkdownCompiler<Output>).bold
        currentOutput = boldCompiler(`${id}-${index}-bold`, currentOutput, currentIndex.value.options)
      }
      result.push(currentOutput)
      lastChar = currentIndex.end
      return result
    }, [])

    if(lastChar < text.length) {
      output.push(text.slice(lastChar))
    }

    return output
  }

}
