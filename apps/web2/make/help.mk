#
# This is the Help Support
# Include like
# Makefile:-----------------
# ....
# include help.mk
# ---------------------------
#
# Original is from: https://codereview.stackexchange.com/questions/94307/built-in-help-in-a-makefile
#
# Howto:
# Label the `target: ` with a double hashed (##) comment. @category prefix is optional.
#
# If you want a variable, available to the help text, you need to set
#   HELP_VAR_EXPORT = ...
# to be the variable name to export.
# They generally need to be "safe" variable values, The variables are wrapped in quotes "..."
# eg:
#   HELP_VAR_EXPORT    := $(HELP_VAR_EXPORT) SOME_VAR
#
DBL_QUOTE  := '"'
VARS_OLD   := $(.VARIABLES)
VARS       = $(filter-out $(VARS_OLD) VARS_OLD VARS,$(.VARIABLES))

.PHONY: help
help: ## @other Show all commands and their descriptions.

	@$(foreach var,$(HELP_VAR_EXPORT), $(var)="$($(var))") \
	perl -e '$(HELP_FUNC)' $(MAKEFILE_LIST)

# Colours for the Help
#
RED     := $(shell tput -Txterm setaf 1)
GREEN   := $(shell tput -Txterm setaf 2)
YELLOW  := $(shell tput -Txterm setaf 3)
BLUE    := $(shell tput -Txterm setaf 4)
PINK    := $(shell tput -Txterm setaf 5)
TEAL    := $(shell tput -Txterm setaf 6)
GREY    := $(shell tput -Txterm setaf 7)
WHITE   := $(shell tput -Txterm setaf 8)
RESET   := $(shell tput -Txterm sgr0)


#
# main function in Perl, which reads the Makefile, extracting the Help text
# $$ENV{"$1"}/g;
# $$text =~ s/(\$$\((.*?)\))/$$ENV{"$$2"}/g;
HELP_FUNC = \
    sub env_resolve {                                                                      \
		my ($$text) = @_;                                                                  \
		$$text =~ s/(\$$\((.*?)\))/$$ENV{$$2}/g;                                           \
		return $$text;                                                                     \
	}                                                                                      \
	while(<>) {                                                                            \
	    push @{$$hyy{$$2 // 'Commands'}}, [$$1, $$3] if                                    \
              /^([\$$\(\)a-zA-Z0-9\-\.%\/_]+)\s*:.*\#\#(?:\s?@([a-zA-Z0-9_\-]+))?\s(.*)$$/ \
	};                                                                                     \
	print "${YELLOW}Usage: make [command]${RESET}\n\n";                                    \
	for (sort keys %hyy) {                                                                 \
	  print "${BLUE}$$_:${RESET}\n";                                                       \
	  for (@{$$hyy{$$_}}) {                                                                \
	    $$sep = " " x (32 - length $$_->[0]);                                              \
	    print " ${TEAL}$$_->[0]${RESET}$$sep${PINK}".env_resolve($$_->[1])."${RESET}\n";   \
	  };                                                                                   \
	  print "\n";                                                                          \
	}
